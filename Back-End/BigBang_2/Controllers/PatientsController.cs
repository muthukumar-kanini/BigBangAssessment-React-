using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BigBang_2.Context;
using BigBang_2.Model;
using BigBang_2.Repositories;

namespace BigBang_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _patientRepository;

        public PatientsController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        // GET: api/Patients
        [HttpGet]
        //[Authorize(Roles = "Admin, Doctor, Patient")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            var patients = await _patientRepository.GetPatients();
            return Ok(patients);
        }

        // GET: api/Patients/5
        [HttpGet("{id}")]
        //[Authorize(Roles = "Admin, Doctor, Patient")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _patientRepository.GetPatient(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // PUT: api/Patients/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize(Roles = "Admin, Doctor")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest();
            }

            await _patientRepository.UpdatePatient(patient);

            return NoContent();
        }

        // POST: api/Patients
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize(Roles = "Admin, Doctor")]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            await _patientRepository.CreatePatient(patient);
           
            return CreatedAtAction("GetPatient", new { id = patient.PatientId }, patient);
        }

        // DELETE: api/Patients/5
        [HttpDelete("{id}")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            try
            {
                await _patientRepository.DeletePatient(id);
            }
            catch (NotFoundException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
