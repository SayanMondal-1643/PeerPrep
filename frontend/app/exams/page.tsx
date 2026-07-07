import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";

// UNCOMMENT THE CODE BELOW TO FETCH FROM API:
// async function fetchExams() {
//   try {
//     const response = await fetch("http://localhost:5000/api/v1/exams")
//     const result = await response.json()
//     if (result.status === "success") {
//       return result
//     }
//   } catch (error) {
//     console.error("Failed to fetch exams:", error)
//   }
// return null;
// }

interface ExamsResponse {
  status: string;
  results: number;
  exams: {
    _id: string;
    name: string;
  }[];
}

// MOCK DATA - TO BE REMOVED
const mockData: ExamsResponse = {
  status: "success",
  results: 4,
  exams: [
    {
      _id: "0",
      name: "Graduate Aptitude Test in Engineering",
    },
    {
      _id: "1",
      name: "Maulana Abul Kalam Azad University of Technology",
    },
    {
      _id: "2",
      name: "Jadavpur University",
    },
    {
      _id: "3",
      name: "Calcutta University",
    },
  ],
};

export default async function ExamsPage() {
  // UNCOMMENT THE LINE TO FETCH FROM API:
  // const data = await fetchExams();

  // if (!data) return <p>Failed to load exams.</p>;
  // if (data.exams.length === 0) return <p>No exams found.</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Exams", href: "/exams" },
          ]}
        />
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Exams</h1>
          <p className="text-lg text-muted-foreground">
            Select an exam to explore branches, subjects, topics and study
            materials.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* USE 'data' INSTEAD OF 'mockData' WHEN FETCHING FROM API */}
          {mockData.exams.map((exam) => {
            return (
              <Link key={exam._id} href={`/exams/${exam._id}/branches`}>
                <Card className="p-8 h-full cursor-pointer group hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {exam.name}
                      </h2>
                      {/* <p className="text-muted-foreground text-base leading-relaxed">
                        {exam.description}
                      </p> */}
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
