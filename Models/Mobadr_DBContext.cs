using Microsoft.EntityFrameworkCore;

namespace Mobadir_API.Models
{
    public class Mobadr_DBContext: DbContext
    {

        public Mobadr_DBContext(DbContextOptions<Mobadr_DBContext> options): base(options)
        {

        }

        public virtual DbSet<User> Users { get; set; } = null!;


        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        //}
    }
}
