using System.ComponentModel.DataAnnotations;

namespace BigBang_2.Model
{
    public class Patient
    {
        [Key]
        public int PatientId { get; set; }

        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }

        public string? PatientEmail { get; set; }

        public string? Password { get; set; }

        public string? Disease { get; set; }


        

        public Doctor? Doctor { get; set; }
       
    }
}
