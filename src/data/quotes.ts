export interface HistoricalQuote {
  text: string;
  author: string;
  year?: string;
  context?: string;
}

export const HISTORICAL_QUOTES: HistoricalQuote[] = [
  {
    text: "Serás lo que debas ser, o no serás nada.",
    author: "José de San Martín",
    year: "1820",
    context: "Carta a Tomás Guido"
  },
  {
    text: "Hace más ruido un solo hombre gritando que cien mil que callan.",
    author: "José de San Martín",
    year: "1816",
    context: "Reflexión militar"
  },
  {
    text: "Divididos seremos esclavos; unidos, estoy seguro que los venceremos: hagamos un esfuerzo de patriotismo, depongamos resentimientos particulares y concluyamos nuestra obra con honor.",
    author: "José de San Martín",
    year: "1819",
    context: "Proclama al Ejército de los Andes"
  },
  {
    text: "La conciencia es el mejor juez que tiene un hombre de bien.",
    author: "José de San Martín",
    year: "1827",
    context: "Desde el exilio en Europa"
  },
  {
    text: "Mi sable nunca saldrá de la vaina por opiniones políticas.",
    author: "José de San Martín",
    year: "1829",
    context: "Negativa a intervenir en guerras civiles"
  },
  {
    text: "La América es libre, independiente y soberana por la voluntad de los pueblos.",
    author: "José de San Martín",
    year: "1821",
    context: "Proclamación de la Independencia del Perú"
  },
  {
    text: "Un soldado no debe jamás derramar la sangre de sus hermanos de patria.",
    author: "José de San Martín",
    year: "1823",
    context: "Manifiesto a la Nación"
  },
  {
    text: "Si hay victoria en vencer al enemigo, la hay mayor en vencerse a sí mismo.",
    author: "José de San Martín",
    year: "1817",
    context: "Tras la Batalla de Chacabuco"
  }
];
