import { LanguageProvider } from "@/providers/LanguageProvider";

export default function IndexContainer({ children }) {

    return (
        <LanguageProvider>
            {children}
        </LanguageProvider>
    )
}