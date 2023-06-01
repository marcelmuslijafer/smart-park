using IOT_virtual.Models.Create.SensorBody;
using IOT_virtual.Models.Create.SensorStatus;

namespace IOT_virtual.Models.Create;

public class SensorBody4 : ISensorBody
{
    public ISensorReading Grupa9UltrazvucniSenzor4 { get; set; } = default!;

    private SensorBody4()
    {
        Grupa9UltrazvucniSenzor4 = new InitSensorReading();
    }

    private SensorBody4(int status)
    {
        Grupa9UltrazvucniSenzor4 = new StatusSensorReading(status);
    }

    public static SensorBody4 CreateInitSensorBody4()
    {
        return new SensorBody4();
    }

    public static SensorBody4 CreateStatusSensorBody4(int status)
    {
        return new SensorBody4(status);
    }
}
