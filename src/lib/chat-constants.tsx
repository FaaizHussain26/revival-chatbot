export type ChatOption = {
  id: string;
  text: string;
  value: string;
  description: string;
};

interface InitialMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  options?: ChatOption[];
}

export const INITIAL_OPTIONS: ChatOption[] = [
  {
    id: "1",
    text: "Sponsor",
    value: "sponsor",
    description: "Explore sponsorship opportunities & collaborate with us.",
  },
  {
    id: "2",
    text: "Patient",
    value: "patient",
    description: "Find patient services, medical records, and support.",
  },
  {
    id: "3",
    text: "Physician",
    value: "physician",
    description: "Access resources, consultations, and support.",
  },
  {
    id: "4",
    text: "Others",
    value: "others",
    description: "For general inquiries, feedback, or questions.",
  },
];

export const INITIAL_MESSAGE: InitialMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Welcome! How can I help you today?",
    options: INITIAL_OPTIONS,
  },
];
