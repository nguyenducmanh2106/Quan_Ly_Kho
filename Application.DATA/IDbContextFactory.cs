namespace Application.Data
{
    public interface IDbContextFactory<T>
    {
        T GetContext();
    }
}
