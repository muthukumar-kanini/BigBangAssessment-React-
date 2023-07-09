using BigBang_2.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BigBang_2.Repositories
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetDoctors();
        Task<IEnumerable<Doctor>> GetApprovedDoctors();
        Task<Doctor> GetDoctor(int id);
        Task<Doctor> CreateDoctor([FromForm] Doctor doctor, IFormFile imageFile);
        Task<Doctor> UpdateDoctor(int id, [FromForm] Doctor doctor, IFormFile imageFile);
        Task DeleteDoctor(int id);
        Task<Doctor> GetDoctorByEmail(string doctorEmail);
    }
}
