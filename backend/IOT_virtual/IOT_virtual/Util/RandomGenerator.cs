namespace IOT_virtual.Util;

public class RandomGenerator
{
    private static Random _random = new Random();

    public static double GetPseudoDoubleWithinRange(double lowerBound, double upperBound)
    {
        var rDouble = _random.NextDouble();
        var rRangeDouble = rDouble * (upperBound - lowerBound) + lowerBound;
        return rRangeDouble;
    }

    public static int GetRandomIsForDisabled()
    {
        var random = _random.Next(1, 4);
        if (random == 3) return 1;
        return 0;
    }
}
