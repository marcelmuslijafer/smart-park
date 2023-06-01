using IOT_virtual.Models.Create.SensorBody;
using IOT_virtual.Models.Create.SensorStatus;

namespace IOT_virtual.Models.Create;

public class SensorBody6 : ISensorBody
{
    public ISensorReading Grupa9UltrazvucniSenzor6 { get; set; } = default!;

    private SensorBody6()
    {
        Grupa9UltrazvucniSenzor6 = new InitSensorReading();
    }

    private SensorBody6(int status)
    {
        Grupa9UltrazvucniSenzor6 = new StatusSensorReading(status);
    }

    public static SensorBody6 CreateInitSensorBody6()
    {
        return new SensorBody6();
    }

    public static SensorBody6 CreateStatusSensorBody6(int status)
    {
        return new SensorBody6(status);
    }
}
