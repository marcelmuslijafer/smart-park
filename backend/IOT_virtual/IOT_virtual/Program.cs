using IOT_virtual.Models.Create;
using IOT_virtual.Services;


var sensorHttpService = new SensorHttpService();


Console.WriteLine("Creating initial sensor readings for virtual sensors 2, 3, 4, 5 and 6.");

for (int i = 2; i <= 6; i++)
{
    var initSensorReading = SensorReading.CreateInitSensorReading(2);
    await sensorHttpService.CreateSensorReadingAsync(initSensorReading);
}




