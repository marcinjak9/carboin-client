import React, { useState } from 'react'
import { connect } from 'react-redux';
// import { Api } from '../../utils/request'


const Profile = ({
  save,
  auth: { user }
}) => {
  const dName = user ? user.displayName : ''
  const pURL = user ? user.photoURL : ''
  const [displayName, setDisplayName] = useState(dName)
  const [photoURL, setPhotoURL] = useState(pURL)

  const uplodAvatar = async (file) => {
    // const image = await Api().uploadAvatar(file)
    // setPhotoURL(image)
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 500, margin: '0 auto' }}>
      <h2>Profile</h2>
      <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} />
      <input type="file" onChange={e => uplodAvatar(e.target.files[0])}/>
      <button onClick={() => save(displayName, photoURL)}>Save</button>
    </div>
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })



const mapDispatchToProps = () => ({
  save: async (name, photoURL) => {
    // await Api().auth.currentUser.updateProfile({
    //   displayName: name,
    //   photoURL
    // })
    // await firebase.auth().curre
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
