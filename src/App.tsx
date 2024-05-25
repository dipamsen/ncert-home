import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Link,
  Typography,
} from "@mui/material";
import grade1112, { Subject } from "./data/1112";
import grade8 from "./data/8";

type Chapter = { name: string; icon?: string; dropped?: boolean };

type Grade = {
  grade: string;
  subjects: Record<string, Record<string, Record<string, Chapter>>>;
};

function ChapterCard({
  chapter,
  fallback,
  file,
}: {
  chapter: Chapter;
  fallback?: string;
  file: string;
}) {
  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`pdf/${file}`}
        target="_blank"
        sx={{ height: "100%", display: "flex" }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Box display="flex" alignItems="center" gap="10px" alignSelf="center">
            <Avatar
              variant="square"
              src={`https://web.getmarks.app/icons/exam/${
                chapter.icon || fallback
              }`}
            />
            <Typography
              variant="h6"
              color={chapter.dropped ? "orange" : undefined}
            >
              {chapter.name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const grdMap: Record<string, Grade> = {
  1112: grade1112,
  8: grade8,
};

const fallbacks: Record<string, string> = {
  Maths: "ic_content_subject_mathematics.svg",
  Science: "ic_content_subject_chemistry.svg",
};

function App({ grd }: { grd?: number }) {
  const props = {
    display: "grid",
    // responsive
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    rowGap: "5px",
    columnGap: "5px",
    marginY: "10px",
  };

  grd = grd || 1112;

  const currGrade = grdMap[grd];

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      <Typography variant="h3">NCERT Books</Typography>
      {Object.entries<Subject>(currGrade.subjects).map(([subject, books]) => (
        <>
          <Typography variant="h4">{subject}</Typography>
          <Box {...props}>
            {Object.entries(books).map(([bid, book]) =>
              Object.entries(book).map(([id, chapter]) => (
                <ChapterCard
                  key={id}
                  chapter={chapter}
                  file={`${bid}${id}.pdf`}
                  fallback={fallbacks[subject]}
                />
              ))
            )}
          </Box>
        </>
      ))}
      {grd !== 1112 && (
        <>
          * Chapters marked in{" "}
          <Typography display={"inline"} color="orange">
            orange
          </Typography>{" "}
          have been dropped from the textbook, as per NCERT Rationalisation of
          Content, 2023.
        </>
      )}
    </Container>
  );
}

export default App;
