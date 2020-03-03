using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Helper;
using DatingApp.API.Models;
using DatingApp.API.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/user/{userId}/photos")]
    [ApiController]
    public class PhotoController: ControllerBase
    {
        private readonly IDatingRepository repo;
        private readonly IMapper mapper;
        private readonly IOptions<CloudinarySettings> cloudinarySettings;
        private Cloudinary cloudinary;

        public PhotoController(IDatingRepository repo,
                                IMapper mapper,
                                IOptions<CloudinarySettings> CloudinarySettings)
        {
            this.repo = repo;
            this.mapper = mapper;
            this.cloudinarySettings = CloudinarySettings;

            Account acc = new Account(
                cloudinarySettings.Value.CloudName,
                cloudinarySettings.Value.ApiKey,
                cloudinarySettings.Value.ApiSecret
                );

            cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await repo.GetPhoto(id);

            var photo = mapper.Map<PhotoForReturnViewModel>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]PhotoForCreationViewModel photoForCreation)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                {
                    return Unauthorized();
                }

                var userFromDB = await repo.GetUser(userId);

                var file  = photoForCreation.File;
                var uploadResult = new ImageUploadResult();

                if( file.Length > 0) 
                {
                    using(var stream = file.OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(file.Name, stream), 
                            Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                        };

                        uploadResult = cloudinary.Upload(uploadParams);
                    }   
                }

                photoForCreation.Url = uploadResult.Uri.ToString();
                photoForCreation.PublicId = uploadResult.PublicId;

                var photo = mapper.Map<Photo>(photoForCreation);

                if(!userFromDB.Photos.Any(u => u.IsMain))
                {
                    photo.IsMain = true;
                }

                userFromDB.Photos.Add(photo);

                if(await repo.SaveAll())
                {
                    var photoToReturn = mapper.Map<PhotoForReturnViewModel>(photo);
                    return CreatedAtRoute("GetPhoto", new { userId, id = photo.Id }, photoToReturn );
                }

                return BadRequest("Could not add the photo");

        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id) 
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await repo.GetUser(userId);

            if(!user.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }

            var photoFromRepo = await repo.GetPhoto(id);

            if(photoFromRepo.IsMain)
                return BadRequest("This is alredy the main photo");

            var currenMainPhoto = await repo.GetMainPhotoForUser(userId);
            currenMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if(await repo.SaveAll())
                return NoContent();
            
            return BadRequest("Could not ser photo to main");

        }
    }
}