using IOT_virtual.Models.Create.SensorBody;
using IOT_virtual.Models.Create.SensorStatus;

namespace IOT_virtual.Models.Create;

public class SensorBody2 : ISensorBody
{
    public ISensorReading Grupa9UltrazvucniSenzor2 { get; set; } = default!;

    private SensorBody2()
    {
        Grupa9UltrazvucniSenzor2 = new InitSensorReading();
    }

    private SensorBody2(int status)
    {
        Grupa9UltrazvucniSenzor2 = new StatusSensorReading(status);
    }

    public static SensorBody2 CreateInitSensorBody2()
    {
        return new SensorBody2();
    }

    public static SensorBody2 CreateStatusSensorBody2(int status)
    {
        return new SensorBody2(status);
    }
}
