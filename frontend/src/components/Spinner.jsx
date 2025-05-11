import { ScaleLoader } from 'react-spinners'

const Spinner = ({ loading }) => {
  return (
    <ScaleLoader
      color='#4338ca'
      loading={loading}
      cssOverride={{
        display: 'block',
        margin: "100px auto",
        textAlign: 'center'
      }}
      size={300}
    />
  )
}

export default Spinner