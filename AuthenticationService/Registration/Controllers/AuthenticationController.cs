using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Registration.Authentication;
using Registration.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Registration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;

        public AuthenticationController(UserManager<ApplicationUser> _userManager , RoleManager<IdentityRole> _roleManager , IConfiguration _configuration)
        {
            userManager = _userManager;
            roleManager = _roleManager;
            configuration = _configuration;
        }

        [HttpPost]
        [Route("register")]
        //Postman Local Host Test Registration URL :  http://localhost:24405/api/Authentication/register // 
        public async Task<IActionResult> Register([FromBody] Register register)
        {
            // Check By Email --> if the user already exists in the database 
            var userExist = await userManager.FindByNameAsync(register.UserName);

            
            if (userExist is not null) 
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Already Exist" });
            
            
            ApplicationUser user = new ApplicationUser()
            {
                Email = register.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = register.UserName
            };
            
            var result = await userManager.CreateAsync(user, register.Password);
            if(!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User Creation Faild" });
            
            return Ok(new Response { Status = "Success", Message = "User Creation Successfully" });
        }


        [HttpPost]
        [Route("login")]
        //Postman Local Host Test Registration URL :  http://localhost:24405/api/Authentication/login // 
        public async Task<IActionResult>Login([FromBody] Login login)
        {
            var user = await userManager.FindByNameAsync(login.UserName);

            if(user is not null && await userManager.CheckPasswordAsync(user, login.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            return Unauthorized();
            
        }
    }
}
