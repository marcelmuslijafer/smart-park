namespace IOT_virtual.Models.Create.SensorStatus;

public class StatusSensorReading : ISensorReading
{
    public int Grupa9Status { get; set; }

    public StatusSensorReading(int status)
    {
        Grupa9Status = status;
    }
}
