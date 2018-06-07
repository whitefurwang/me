class LongPressedButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = { speed: 300 }
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }

  handleChange () {
    this.props.handleChange(Number(this.props.value))
    this.tid = setTimeout(() => {
      this.handleChange()
      this.setState({
        speed: this.state.speed <= 100 ? 100 : this.state.speed -= 100
      })
    }, this.state.speed)
  }

  handleStart (e) {
    e.preventDefault()
    this.handleChange()
    document.addEventListener('mouseup', this.handleStop, false)
  }

  handleStop () {
    clearTimeout(this.tid)
    document.removeEventListener('mouseup', this.handleStop, false)
    this.setState({ speed: 300 })
  }

  render () {
    return <a href='#' onMouseDown={this.handleStart}>{this.props.value}</a>
  }
}
