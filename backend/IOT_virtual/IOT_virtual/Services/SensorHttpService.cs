using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using IOT_virtual.Exceptions;
using IOT_virtual.Models.Get;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;

namespace IOT_virtual.Services;

public class SensorHttpService
{
    private const string BaseAddress = "https://161.53.19.19:56443/";  
    private const string ApiUrl = "m2m/data";  
    private const string Username = "IoTGrupa9";  
    private const string ApiUPasswordrl = "IoTProject123";  

    private readonly HttpClient _httpClient;

    public SensorHttpService()
    {
        var handler = new HttpClientHandler();
        handler.ClientCertificateOptions = ClientCertificateOption.Manual;
        handler.ServerCertificateCustomValidationCallback =
            (httpRequestMessage, cert, cetChain, policyErrors) =>
            {
                return true;
            };


        _httpClient = new HttpClient(handler);

        _httpClient.BaseAddress = new Uri(BaseAddress);

        string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{Username}:{ApiUPasswordrl}"));
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

        _httpClient.DefaultRequestHeaders.Add("Accept", "application/vnd.ericsson.m2m.output+json");
        _httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/vnd.ericsson.simple.input.hierarchical+json");
    }

    public async Task CreateSensorReadingAsync(Models.Create.SensorReading sensorReading)
    {
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, ApiUrl);

        var json = JsonConvert.SerializeObject(sensorReading);

        
        //var stringContent = new StringContent(json, Encoding.UTF8, "application/vnd.ericsson.simple.input.hierarchical+json");
        var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
        //var stringContent = new StringContent(json);
        //stringContent.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ericsson.simple.input.hierarchical+json");
        //stringContent.Headers.Add("Content-Type", "application/vnd.ericsson.simple.input.hierarchical+json");
        request.Content = stringContent;

        //request.Content.Headers.Add("Content-Type", "application/vnd.ericsson.simple.input.hierarchical+json");
        request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ericsson.simple.input.hierarchical+json");

        //request.Headers.AddWithoutValidation("Content-Type", "application/vnd.ericsson.simple.input.hierarchical+json");

        var httpResponseMessage = await _httpClient.SendAsync(request);

        var httpResponseMessage1 = await _httpClient.PostAsJsonAsync(ApiUrl, sensorReading);


        string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{Username}:{ApiUPasswordrl}"));
        var httpRequestMessage = new HttpRequestMessage
        {
            Method = HttpMethod.Post,
            RequestUri = new Uri(BaseAddress + ApiUrl),
            Content = new StringContent(JsonConvert.SerializeObject(sensorReading))
        };
        httpRequestMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.ericsson.simple.input.hierarchical+json");
        var httpResponseMessage2 = await _httpClient.SendAsync(httpRequestMessage);


        if (!httpResponseMessage.IsSuccessStatusCode)
        {
            throw new HttpException("Došlo je do pogreške pri slanju očitanja senzora na plaformu.");
        }
    }

    public async Task<SensorContent> GetSensorReadingsAsync(
        string sensorSpec,
        string resourceSpec)
    {
        var url = ApiUrl;

        url = QueryHelpers.AddQueryString(url, "sensorSpec", sensorSpec);
        url = QueryHelpers.AddQueryString(url, "resourceSpec", resourceSpec);

        var httpResponseMessage = await _httpClient.GetAsync(url);

        if (!httpResponseMessage.IsSuccessStatusCode)
        {
            throw new HttpException("Došlo je do pogreške pri dohvaćanja očitanja senzora s plaforme.");
        }

        var sensorContent = await httpResponseMessage.Content.ReadFromJsonAsync<SensorContent>();

        return sensorContent!;
    }

    public async Task<SensorContent> GetLastNSensorReadingsAsync(
       string sensorSpec,
       string resourceSpec,
       int latestNCount)
    {
        var url = ApiUrl;

        url = QueryHelpers.AddQueryString(url, "sensorSpec", sensorSpec);
        url = QueryHelpers.AddQueryString(url, "resourceSpec", resourceSpec);
        url = QueryHelpers.AddQueryString(url, "latestNCount", latestNCount.ToString());

        var httpResponseMessage = await _httpClient.GetAsync(url);

        if (!httpResponseMessage.IsSuccessStatusCode)
        {
            throw new HttpException("Došlo je do pogreške pri dohvaćanja očitanja senzora s plaforme.");
        }

        var sensorContent = await httpResponseMessage.Content.ReadFromJsonAsync<SensorContent>();

        return sensorContent!;
    }
}
