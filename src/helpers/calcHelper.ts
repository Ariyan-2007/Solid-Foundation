export function calculateAge(birthDate: Date) {
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
}

export function calculatePaginationMeta(
  page: number,
  per_page: number,
  total: number,
  path: string
) {
  const last_page = Math.ceil(total / per_page);
  const from = (page - 1) * per_page + 1;
  const to = Math.min(from + per_page - 1, total);

  return {
    current_page: page,
    from,
    to,
    last_page,
    path,
    per_page,
    total,
  };
}
