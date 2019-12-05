using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
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
        public async Task<IActionResult> Register(string username, string password)
        {
            username = username.ToLower();

            if( await repository.UserExist(username) )
            {
                return BadRequest("Username alredy exists");                
            }

            var userToCrearte = new User
            {
                Username = username
            };

            var createUser = await repository.Register(userToCrearte, password);

            return StatusCode(201);
        }

    }
}