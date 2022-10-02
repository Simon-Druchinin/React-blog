export const Column = ({ children, className }) => {
  return(
    <div className={"column-container " + className}>
      { children }
    </div>
  )
}