class Select extends React.Component {
  constructor (props) {
    super(props)

    let initState = {}
    if (this.props.isDropDown) {
      initState = $.extend(initState, { isOpen: false })
    }
    if (this.props.isDropDown || this.props.isDefaultSelect) {
      initState = $.extend(initState, { isWeak: false })
    }
    this.state = initState
    this.id = this.props.id || 'select' // 'select' as default id

    this.checkIsWeak = this.checkIsWeak.bind(this)

    this.handleDropDownClick = this.handleDropDownClick.bind(this)
    this.handleDropDownClickOutSide = this.handleDropDownClickOutSide.bind(this)

    this.hideOption = this.hideOption.bind(this)
    this.toggleOption = this.toggleOption.bind(this)
    this.changeValue = this.changeValue.bind(this)
    this.changeValueDefaultSelect = this.changeValueDefaultSelect.bind(this)
  }

  checkIsWeak (options, nowValue) {
    for (let i = 0, len = options.length; i < len; i++) {
      if (options[i].value === nowValue) {
        this.setState({ isWeak: options[i].isWeak })
        break
      }
    }
  }

  handleDropDownClick () {
    if (!this.state.isOpen) {
      document.addEventListener('click', this.handleDropDownClickOutSide, false)
    }
  }

  handleDropDownClickOutSide (e) {
    this.select.contains(e.target) || this.hideOption()
  }

  hideOption () {
    if (this.props.isDropDown && this.state.isOpen) {
      document.removeEventListener('click', this.handleDropDownClickOutSide, false)
    }
    this.setState({ isOpen: false })
  }

  toggleOption () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  changeValue (newValue) {
    this.props.isDropDown && this.hideOption()

    if (newValue !== this.props.nowValue) {
      this.props.onChangeValue(newValue)
    }
  }

  changeValueDefaultSelect (e) {
    this.props.onChangeValue(e.target.value)
  }

  componentDidMount () {
    this.checkIsWeak(this.props.options, this.props.nowValue)
  }

  render () {
    const getOptionClass = opt => {
      const optionClass =
        `${opt.isDisabled ? ' disabled' : ''}` +
        `${opt.isWeak ? ' weak' : ''}` +
        `${opt.value === this.props.nowValue ? ' selected' : ''}`
      return !optionClass.trim() ? null : optionClass.trim()
    }

    const Options = this.props.options.map(option => {
      if (this.props.isDefaultSelect) {
        return (
          <option
            key={`${this.id}${option.value}`}
            value={option.value}
            disabled={option.isDisabled}
            className={option.isWeak ? 'weak' : null}
          >
            {option.text}
          </option>
        )
      } else {
        return (
          <li key={`${this.id}${option.value}`} className={getOptionClass(option)} >
            {
              option.isDisabled
              ? <div><span>{option.text}</span></div>
              : <a href='javascript:;' onClick={this.changeValue.bind(this, option.value)}>
                <span>{option.text}</span>
              </a>
            }
          </li>
        )
      }
    })

    const componentClass =
      'r-select' +
      `${(this.props.isDropDown || this.props.isDefaultSelect) ? '' : ' r-select-radio'}` +
      `${this.props.customClass ? ` ${this.props.customClass}` : ''}`

    return (
      <div
        ref={select => { this.select = select }}
        id={this.props.isDefaultSelect ? null : this.id}
        className={componentClass}
        onClick={this.props.isDropDown && this.handleDropDownClick}
      >
        {
          this.props.isDefaultSelect &&
          <select
            name={this.id}
            id={this.id}
            onChange={this.changeValueDefaultSelect}
            value={this.props.nowValue}
            className={this.state.isWeak ? 'weak' : null}
          >
            <option disabled hidden>{this.props.defaultText}</option>
            {Options}
          </select>
        }
        {
          this.props.isDropDown &&
          <div className={`r-select__txt${this.state.isWeak ? ' weak' : ''}`}>
            <a href='javascript:;' onClick={this.toggleOption}>
              {this.props.nowText || this.props.defaultText}
            </a>
          </div>
        }
        {
          (!this.props.isDefaultSelect && (!this.props.isDropDown || this.state.isOpen)) &&
          <ul className='r-select__options'>
            {Options}
          </ul>
        }
      </div>
    )
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.nowValue !== this.props.nowValue) {
      if (nextProps.nowValue === '') {
        this.setState({ isWeak: false })
      } else {
        this.checkIsWeak(nextProps.options, nextProps.nowValue)
      }
    }
  }
}
