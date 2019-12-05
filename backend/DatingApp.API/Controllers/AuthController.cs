using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using DatingApp.API.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository repository;

        public AuthController(IAuthRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterViewModel model)
        {
            model.Username = model.Username.ToLower();

            if( await repository.UserExist(model.Username) )
            {
                return BadRequest("Username alredy exists");                
            }

            var userToCrearte = new User
            {
                Username = model.Username
            };

            var createUser = await repository.Register(userToCrearte, model.Password);

            return StatusCode(201);
        }

    }
}