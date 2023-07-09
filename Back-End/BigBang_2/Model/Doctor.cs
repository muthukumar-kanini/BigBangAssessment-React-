using System.ComponentModel.DataAnnotations;

namespace BigBang_2.Model
{
    public class Doctor
    {

        [Key]
        public int DoctorId { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Specialization { get; set; }
        public string? Doctor_Email { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string? PhoneNumber { get; set; }    
        public string? Password { get; set; }
        public string? Status { get; set; }
        public string? DocImagePath { get; set; }
        public ICollection<Patient>? Patients { get; set; }
        public ICollection<Appointment>? Appointments{ get; set; }
    }
}
