using BigBang_2.Model;
using BigBang_2.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BigBang_2.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepository _repository;

        public DoctorController(IDoctorRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Doctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            var doctors = await _repository.GetDoctors();
            return Ok(doctors);
        }

        [HttpGet("ApprovedDoctors")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetApprovedDoctors()
        {
            var approvedDoctors = await _repository.GetApprovedDoctors();
            return Ok(approvedDoctors);
        }

        // GET: api/Doctor/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _repository.GetDoctor(id);

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }

        // POST: api/Doctor
        /// <summary>
        /// [Authorize(Roles = "Admin")]
        /// </summary>
        /// <param name="doctor"></param>
        /// <param name="imageFile"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateDoctorRequest([FromForm] Doctor doctor, IFormFile? imageFile)
        {
            var createdDoctor = await _repository.CreateDoctor(doctor, imageFile);
            return CreatedAtAction("GetDoctor", new { id = createdDoctor.DoctorId }, createdDoctor);
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            await _repository.UpdateDoctor(id, doctor, imageFile);
            return NoContent();
        }

        // DELETE: api/Doctor/5
       [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            await _repository.DeleteDoctor(id);
            return NoContent();
        }

        [HttpGet("GetDoctorByEmail")]
        public async Task<ActionResult<Doctor>> GetDoctorByEmail([FromQuery] string doctorEmail)
        {
            var doctor = await _repository.GetDoctorByEmail(doctorEmail);

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }
    }
}
