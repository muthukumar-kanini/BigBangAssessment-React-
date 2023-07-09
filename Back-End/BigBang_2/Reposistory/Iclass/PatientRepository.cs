using BigBang_2.Context;
using BigBang_2.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BigBang_2.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly MKContext _context;

        public PatientRepository(MKContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Patient>> GetPatients()
        {
            return await _context.patients.ToListAsync();
        }

        public async Task<Patient> GetPatient(int id)
        {
            return await _context.patients.FindAsync(id);
        }

        public async Task CreatePatient(Patient patient)
        {
            _context.patients.Add(patient);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePatient(Patient patient)
        {
            _context.Entry(patient).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePatient(int id)
        {
            var patient = await _context.patients.FindAsync(id);
            if (patient == null)
            {
                throw new NotFoundException("Patient not found");
            }

            _context.patients.Remove(patient);
            await _context.SaveChangesAsync();
        }
    }
}
