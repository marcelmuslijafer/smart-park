using IOT_virtual.Models.Create.SensorBody;
using IOT_virtual.Models.Create.SensorStatus;

namespace IOT_virtual.Models.Create;

public class SensorBody5 : ISensorBody
{
    public ISensorReading Grupa9UltrazvucniSenzor5 { get; set; } = default!;

    private SensorBody5()
    {
        Grupa9UltrazvucniSenzor5 = new InitSensorReading();
    }

    private SensorBody5(int status)
    {
        Grupa9UltrazvucniSenzor5 = new StatusSensorReading(status);
    }

    public static SensorBody5 CreateInitSensorBody5()
    {
        return new SensorBody5();
    }

    public static SensorBody5 CreateStatusSensorBody5(int status)
    {
        return new SensorBody5(status);
    }
}
