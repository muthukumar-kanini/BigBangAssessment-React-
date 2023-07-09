using BigBang_2.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BigBang_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly IHospitalRepository _repository;

        public HospitalsController(IHospitalRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Hospitals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitals()
        {
            var hospitals = await _repository.GetHospitals();
            return Ok(hospitals);
        }

        // GET: api/Hospitals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            var hospital = await _repository.GetHospital(id);

            if (hospital == null)
            {
                return NotFound();
            }

            return hospital;
        }

        // PUT: api/Hospitals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHospital(int id, Hospital hospital)
        {
            try
            {
                await _repository.UpdateHospital(id, hospital);
            }
            catch (ArgumentException)
            {
                return BadRequest();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_repository.HospitalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Hospitals
        [HttpPost]
        public async Task<ActionResult<Hospital>> CreateHospital(Hospital hospital)
        {
            var createdHospital = await _repository.CreateHospital(hospital);
            return CreatedAtAction(nameof(GetHospital), new { id = createdHospital.HospitalId }, createdHospital);
        }

        // DELETE: api/Hospitals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHospital(int id)
        {
            await _repository.DeleteHospital(id);
            return NoContent();
        }
    }

}
