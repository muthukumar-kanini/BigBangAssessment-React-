using System.ComponentModel.DataAnnotations;

namespace BigBang_2.Model
{
    public class Appointment
    {
        [Key]
        public int Appointment_Id { get; set; }
        public string? Appointment_Date { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
