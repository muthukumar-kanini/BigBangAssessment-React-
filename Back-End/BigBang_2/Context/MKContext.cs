using BigBang_2.Model;
using Microsoft.EntityFrameworkCore;
using System;

namespace BigBang_2.Context
{
    public class MKContext:DbContext
    {
        public MKContext(DbContextOptions<MKContext> options) : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient>patients{ get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Admin>? Admins { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        internal Task SaveChanges(Doctor doctor)
        {
            throw new NotImplementedException();
        }
    }
}
