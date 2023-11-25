import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Obtenir les noms de fichiers dans /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Retirer ".md" du nom de fichier pour obtenir l'identifiant
    const id = fileName.replace(/\.md$/, "");

    // Lire le fichier Markdown en tant que chaîne
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Utiliser gray-matter pour analyser la section des métadonnées de l'article
    const matterResult = matter(fileContents);

    // Combiner les données avec l'identifiant
    return {
      id,
      ...matterResult.data,
    };
  });
  // Trier les articles par date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
