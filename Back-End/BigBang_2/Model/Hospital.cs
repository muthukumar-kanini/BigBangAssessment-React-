using System.ComponentModel.DataAnnotations;

namespace BigBang_2.Model
{
    public class Hospital
    {

        [Key]
        public int HospitalId { get; set; }

        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }

        public ICollection<Doctor>? Doctors { get; set; }
        
        
    }
}
