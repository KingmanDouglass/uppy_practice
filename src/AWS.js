import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
const AwsS3 = require('@uppy/aws-s3')
const ms = require('ms')
const React = require('react')
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const GoogleDrive = require('@uppy/google-drive')
const { Dashboard } = require('@uppy/react')


  
class AWS extends React.Component {
 
 
    constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }


    this.uppy = new Uppy({ id: 'uppy1', autoProceed: false, debig: true })
    .use(AwsS3, { host: this.host })
    .use(Tus, { host: this.host })
    .use(GoogleDrive, { host: this.host }).run()
    // .use(Dropbox, { host: this.host }).run();


    // this.uppy = new Uppy({ id: 'uppy1', autoProceed: true, debug: true })
    //   .use(Tus, { endpoint: 'https://master.tus.io/files/' })
    //   .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })

    this.uppy2 = new Uppy({ id: 'uppy2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.uppy.close()
    this.uppy2.close()
    this.host = "localhost:5000";
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Upload Photos</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show/Hide Image Upload
        </label>
        {showInlineDashboard && (
          <Dashboard
            uppy={this.uppy}
            
            plugins={['GoogleDrive']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />
        )}
      </div>
    )
  }
}


export default (AWS);