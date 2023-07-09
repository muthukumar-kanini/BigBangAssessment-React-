using BigBang_2.Model;

public interface IHospitalRepository
{
    Task<IEnumerable<Hospital>> GetHospitals();
    Task<Hospital> GetHospital(int id);
    Task UpdateHospital(int id, Hospital hospital);
    Task<Hospital> CreateHospital(Hospital hospital);
    Task DeleteHospital(int id);

    bool HospitalExists(int id);
}
