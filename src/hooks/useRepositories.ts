import { createContext, useContext } from "react";
import { Repositories } from "../repositories/Repositories";

export const RepositoriesContext = createContext<Repositories | null>(null);

export function useRepositories() {
  const repositories = useContext(RepositoriesContext);

  if (!repositories) {
    throw new Error("useRepositories must be used within RepositoriesContext");
  }

  return { repositories };
}
