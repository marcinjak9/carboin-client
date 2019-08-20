import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { isLoaded } from 'react-redux-firebase'
import Container from '../../Components/Container';
import AvatarUpload from '../../Components/AvatarUpload';
// import { Api } from '../../utils/request'


const Profile = ({
  auth,
  profile,
  firebase
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName)
  const [avatar, setAvatar] = useState(profile.avatar)

  useEffect(() => {
    if (isLoaded(profile)) {
      setDisplayName(profile.displayName)
      setAvatar(profile.avatar)
    }
  }, [isLoaded(profile)])

  const uploadAvatar = async () => {
    const id = auth.uid;
    try {
      const ref = firebase.storage().ref().child(`${id}.${avatar.name.split('.').pop()}`)
      const snapshot = await ref.put(avatar)
      const url = await snapshot.ref.getDownloadURL()
      return url
    } catch (error) {
      console.log(error)
    }
  }

  const save = async () => {
    try {
      const url = await uploadAvatar()
      firebase.updateProfile({
        displayName,
        avatar: url
      })
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div className="section">
      <Container small>
        <h2 className="title">Profile</h2>
        <div className="field">
          <div className="control">
            <input className="input" type="text" placeholder="Name" value={displayName} onChange={({ target: { value }}) => setDisplayName(value)} />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <AvatarUpload
              src={avatar}
              onChange={a => setAvatar(a)}
            />
          </div>
        </div>
        <button className="button is-primary" onClick={save}>
          Save
        </button>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ firebase: { auth, profile } }) => ({ auth, profile })

export default compose(
  withFirebase,
  connect(mapStateToProps)
)(Profile)
