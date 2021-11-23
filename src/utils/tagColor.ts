const tagColor = (tag: string) => {
  const opacity = 0.2;
  const color = [
    { name: `red`, value: `rgba(255, 100, 80, ${opacity})` },
    { name: `orange`, value: `rgba(255, 182, 80, ${opacity})` },
    { name: `yellow`, value: `rgba(255, 226, 94, ${opacity})` },
    { name: `yellow-green`, value: `rgba(124, 219, 77, ${opacity})` },
    { name: `green`, value: `rgba(57, 212, 85, ${opacity})` },
    { name: `cyan`, value: `rgba(255, 226, 94, ${opacity})` },
    { name: `light-blue`, value: `rgba(64, 183, 227, ${opacity})` },
    { name: `blue`, value: `rgba(65, 118, 242, ${opacity})` },
    { name: `violet`, value: `rgba(115, 65, 242, ${opacity})` },
    { name: `pink`, value: `rgba(221, 65, 232, ${opacity})` },   
  ];

  let tempNum = 0;
  for (let i = 0; i < tag.length; i++) {
    tempNum += (tag.charCodeAt(i));
  }

  return color[tempNum % color.length]["value"];
};

export default tagColor;