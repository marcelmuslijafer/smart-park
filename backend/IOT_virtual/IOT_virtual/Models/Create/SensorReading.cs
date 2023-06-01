using IOT_virtual.Exceptions;
using IOT_virtual.Models.Create.SensorBody;

namespace IOT_virtual.Models.Create;

public class SensorReading
{
    public string DeviceId { get; set; } = default!;
    public SensorHeader Header { get; set; } = default!;
    public ISensorBody Body { get; set; } = default!;

    private SensorReading(int sensor)
    {
        DeviceId = "Grupa9GatewayGroup1";
        Header = new SensorHeader();
        switch (sensor)
        {
            case 2:
                Body = SensorBody2.CreateInitSensorBody2();
                break;
            case 3:
                Body = SensorBody3.CreateInitSensorBody3();
                break;
            case 4:
                Body = SensorBody4.CreateInitSensorBody4();
                break;
            case 5:
                Body = SensorBody5.CreateInitSensorBody5();
                break;
            case 6:
                Body = SensorBody6.CreateInitSensorBody6();
                break;
            default:
                throw new InvalidSensorNumberException("Broj senzora koji ste dali nije točan. Taj broj mora biti između 2 i 6 uključivo.");
        }
    }

    private SensorReading(int sensor, int status)
    {
        DeviceId = "Grupa9GatewayGroup1";
        Header = new SensorHeader();
        switch (sensor)
        {
            case 2:
                Body = SensorBody2.CreateStatusSensorBody2(status);
                break;
            case 3:
                Body = SensorBody3.CreateStatusSensorBody3(status);
                break;
            case 4:
                Body = SensorBody4.CreateStatusSensorBody4(status);
                break;
            case 5:
                Body = SensorBody5.CreateStatusSensorBody5(status);
                break;
            case 6:
                Body = SensorBody6.CreateStatusSensorBody6(status);
                break;
            default:
                throw new InvalidSensorNumberException("Broj senzora koji ste dali nije točan. Taj broj mora biti između 2 i 6 uključivo.");
        }
    }

    public static SensorReading CreateInitSensorReading(int sensor)
    {
        return new SensorReading(sensor);
    }

    public static SensorReading CreateStatusSensorReading(int sensor, int status)
    {
        return new SensorReading(sensor, status);
    }
}
