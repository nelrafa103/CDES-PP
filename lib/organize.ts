export const organize = (data: Array<any>) => {
  return data.reduce((acc: Record<string, any[]>, item) => {
    const key = item.__component;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, any[]>);
};
