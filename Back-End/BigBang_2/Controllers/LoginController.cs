using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BigBang_2.Context;
using BigBang_2.Model;

namespace RealEstate2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly MKContext _context;

        private const string DoctorRole = "Doctor";
        private const string AdminRole = "Admin";
        private const string PatientRole = "Patient";

        public TokensController(IConfiguration configuration, MKContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("Doctor")]
        public async Task<IActionResult> Post(Doctor _userData)
        {
            if (_userData != null && !string.IsNullOrEmpty(_userData.Doctor_Email) && !string.IsNullOrEmpty(_userData.Password))
            {
                var user = await GetUser(_userData.Doctor_Email, _userData.Password);

                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                      //  new Claim("DoctorId", user.DoctorId.ToString()),
                        new Claim("Doctor_Email", user.Doctor_Email),
                         new Claim("password", user.Password),
                        new Claim(ClaimTypes.Role, DoctorRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(29),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("Admin")]
        public async Task<IActionResult> PostAdmin(Admin adminData)
        {
            if (adminData != null && !string.IsNullOrEmpty(adminData.Admin_Name) && !string.IsNullOrEmpty(adminData.Admin_Password))
            {
                var admin = await GetAdmin(adminData.Admin_Name, adminData.Admin_Password);

                if (admin != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Admin_Name", admin.Admin_Name),
                        new Claim("Admin_Password", admin.Admin_Password),
                        new Claim(ClaimTypes.Role,AdminRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(5),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost("Patient")]
        public async Task<IActionResult> PostPatient(Patient adminData)
        {
            if (adminData != null && !string.IsNullOrEmpty(adminData.PatientEmail) && !string.IsNullOrEmpty(adminData.Password))
            {
                var adminn = await GetPatient(adminData.PatientEmail, adminData.Password);

                if (adminn != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("PatientEmail", adminn.PatientEmail),
                        new Claim("Password", adminn.Password),
                        new Claim(ClaimTypes.Role, PatientRole)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(95),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }






        private async Task<Doctor> GetUser(string email, string password)
        {
            return await _context.Doctors.FirstOrDefaultAsync(u => u.Doctor_Email == email && u.Password == password);
        }

        private async Task<Admin> GetAdmin(string email, string password)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Admin_Name == email && a.Admin_Password == password);
        }

        private async Task<Patient> GetPatient(string email, string password)
        {
            return await _context.patients.FirstOrDefaultAsync(a => a.PatientEmail == email && a.Password == password);
        }
    }
}
