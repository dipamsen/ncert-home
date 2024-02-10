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
import { physics, chemistry, maths } from "./data";

type Chapter = { name: string; icon?: string };
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
            <Typography variant="h6">{chapter.name}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function App() {
  const props = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    rowGap: "5px",
    columnGap: "5px",
    marginY: "10px",
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      <Typography variant="h3">NCERT Books</Typography>
      <Typography variant="h4">Physics</Typography>
      <Box {...props}>
        {Object.entries(physics.keph).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`keph${id}.pdf`} />
        ))}
        {Object.entries(physics.leph).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`leph${id}.pdf`} />
        ))}
      </Box>
      <Typography variant="h4">Chemistry</Typography>
      <Box {...props}>
        {Object.entries(chemistry.kech).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`kech${id}.pdf`} />
        ))}
        {Object.entries(chemistry.lech).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`lech${id}.pdf`} />
        ))}
      </Box>
      <Typography variant="h4">Maths</Typography>
      <Box {...props}>
        {Object.entries(maths.kemh).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`kemh${id}.pdf`} />
        ))}
        {Object.entries(maths.lemh).map(([id, chapter]) => (
          <ChapterCard key={id} chapter={chapter} file={`lemh${id}.pdf`} />
        ))}
      </Box>
    </Container>
  );
}

export default App;
