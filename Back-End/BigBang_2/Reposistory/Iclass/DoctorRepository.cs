using BigBang_2.Context;
using BigBang_2.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BigBang_2.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly MKContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DoctorRepository(MKContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IEnumerable<Doctor>> GetDoctors()
        {
            return await _context.Doctors.Include(x=>x.Patients).ToListAsync();
        }

        public async Task<IEnumerable<Doctor>> GetApprovedDoctors()
        {
            return await _context.Doctors.Where(d => d.Status == "Approved").ToListAsync();
        }

        public async Task<Doctor> GetDoctor(int id)
        {
            return await _context.Doctors
                .Include(d => d.Patients)
                .FirstOrDefaultAsync(d => d.DoctorId == id);
        }


        public async Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                throw new ArgumentException("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/doctor");
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(stream);
            }

            doctor.DocImagePath = fileName;
           
            doctor.Status = "Pending";
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return doctor;
        }

        public async Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile)
        {
            var existingDoctor = await _context.Doctors.FindAsync(id);

            if (existingDoctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads/doctor");

                if (!string.IsNullOrEmpty(existingDoctor.DocImagePath))
                {
                    var existingFilePath = Path.Combine(uploadsFolder, existingDoctor.DocImagePath);
                    if (File.Exists(existingFilePath))
                    {
                        File.Delete(existingFilePath);
                    }
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(stream);
                }

                doctor.DocImagePath = fileName;
            }
            else
            {
                doctor.DocImagePath = existingDoctor.DocImagePath;
            }
          
        


            existingDoctor.Name = doctor.Name;
            existingDoctor.Location = doctor.Location;
            existingDoctor.PhoneNumber = doctor.PhoneNumber;
            existingDoctor.Doctor_Email = doctor.Doctor_Email;
            existingDoctor.Password = doctor.Password;
            existingDoctor.Status = doctor.Status;
            existingDoctor.Specialization = doctor.Specialization;
            existingDoctor.DocImagePath = doctor.DocImagePath;
           
            await _context.SaveChangesAsync();

            return existingDoctor;
        }
        public async Task DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                throw new NotFoundException("Doctor not found");
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
        }
        public async Task<Doctor> GetDoctorByEmail(string doctorEmail)
        {
            return await _context.Doctors.FirstOrDefaultAsync(d => d.Doctor_Email == doctorEmail);
        }

    }

    public class NotFoundException : Exception
    {
        public NotFoundException()
        {
        }

        public NotFoundException(string message) : base(message)
        {
        }

        public NotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
