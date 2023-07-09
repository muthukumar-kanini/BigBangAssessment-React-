using BigBang_2.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BigBang_2.Repositories
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetPatients();
        Task<Patient> GetPatient(int id);
        Task CreatePatient(Patient patient);
        Task UpdatePatient(Patient patient);
        Task DeletePatient(int id);
    }
}
