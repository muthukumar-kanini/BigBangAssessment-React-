using BigBang_2.Context;
using BigBang_2.Model;
using Microsoft.EntityFrameworkCore;

public class HospitalRepository : IHospitalRepository
{
    private readonly MKContext _context;

    public HospitalRepository(MKContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Hospital>> GetHospitals()
    {
        return await _context.Hospitals.ToListAsync();
    }

    public async Task<Hospital> GetHospital(int id)
    {
        return await _context.Hospitals.FindAsync(id);
    }

    public async Task UpdateHospital(int id, Hospital hospital)
    {
        if (id != hospital.HospitalId)
        {
            throw new ArgumentException("Invalid hospital ID");
        }

        _context.Entry(hospital).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task<Hospital> CreateHospital(Hospital hospital)
    {
        _context.Hospitals.Add(hospital);
        await _context.SaveChangesAsync();
        return hospital;
    }

    public async Task DeleteHospital(int id)
    {
        var hospital = await _context.Hospitals.FindAsync(id);
        if (hospital != null)
        {
            _context.Hospitals.Remove(hospital);
            await _context.SaveChangesAsync();
        }
    }

    public bool HospitalExists(int id)
    {
        return _context.Hospitals.Any(e => e.HospitalId == id);
    }
}
