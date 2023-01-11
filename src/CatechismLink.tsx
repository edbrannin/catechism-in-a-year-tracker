/**
 * TODO: Support linking to Vatican / scborromoeo / canonlaw.ninja
 * 
 * @param startParagraph
 * @param endParagraph 
 * @returns 
 */
const catechismUrl = (startParagraph: number, endParagraph: number) => `https://www.catholiccrossreference.online/catechism/#!/search/${startParagraph}-${endParagraph}`;

const CatechismLink = ({
  startParagraph,
  endParagraph,
} : {
  startParagraph?: number,
  endParagraph?: number,
}) => {
  if (!startParagraph || !endParagraph) {
    return <></>;
  }
  
  return (
    <a
      href={catechismUrl(startParagraph, endParagraph)}
      target="_blank"
    >{`${startParagraph} - ${endParagraph}`}</a>
  );
};

export default CatechismLink;