using Microsoft.EntityFrameworkCore;

namespace mobadir_API_1.Models
{
    public class DbInitializer
    {
        private readonly ModelBuilder modelBuilder;

        public DbInitializer(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            // seeding data to grade table // don't forget to add migration
            modelBuilder.Entity<Grade>().HasData(
                new Grade { Id = 1, IsVisible = true, Name = "الصف الأول" },
                new Grade { Id = 2, IsVisible = true, Name = "الصف الثاني" },
                new Grade { Id = 3, IsVisible = true, Name = "الصف الثالث" },
                new Grade { Id = 4, IsVisible = true, Name = "الصف الرابع" },
                new Grade { Id = 5, IsVisible = true, Name = "الصف الخامس" },
                new Grade { Id = 6, IsVisible = true, Name = "الصف السادس" },
                new Grade { Id = 7, IsVisible = true, Name = "الصف السابع" },
                new Grade { Id = 8, IsVisible = true, Name = "الصف الثامن" },
                new Grade { Id = 9, IsVisible = true, Name = "الصف التاسع" },
                new Grade { Id = 10, IsVisible = true, Name = "الصف العاشر" },
                new Grade { Id = 11, IsVisible = true, Name = "الصف الحادي عشر" },
                new Grade { Id = 12, IsVisible = true, Name = "الصف الثاني عشر" }
            );
        }
    }
}
