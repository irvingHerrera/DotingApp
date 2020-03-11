using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Models;
using DatingApp.API.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repository;
        private readonly IConfiguration config;
        private readonly IMapper mapper;

        public AuthController(IAuthRepository repository, IConfiguration config, IMapper mapper)
        {
            this.config = config;
            this.mapper = mapper;
            this.repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterViewModel model)
        {
            model.Username = model.Username.ToLower();

            if (await repository.UserExist(model.Username))
            {
                return BadRequest("Username alredy exists");
            }

            var userToCrearte = mapper.Map<User>(model);

            var createUser = await repository.Register(userToCrearte, model.Password);

            var userToReturn = mapper.Map<UserForDetailViewModel>(createUser);

            return CreatedAtAction("GetUser", new {controller = "User", id = createUser.Id}, userToReturn);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginViewModel model)
        {
            
            var userFromRepo = await repository.Login(model.Username.ToLower(), model.Password);
            
            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user = mapper.Map<UserForListViewModel>(userFromRepo);

            return Ok(new {
                token = tokenHandler.WriteToken(token),
                user
            });
            
        }
    }
}