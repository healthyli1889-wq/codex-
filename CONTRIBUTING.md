# Contributing to ContentMind

Thank you for considering contributing to ContentMind! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and extension version
   - Screenshots if applicable

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/contentmind-extension.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments where necessary
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Include screenshots if UI changes

## Development Setup

1. Clone the repository
2. Load as unpacked extension in Chrome
3. Make changes
4. Reload extension to test
5. Check browser console for errors

## Code Style

- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small
- Use ES6+ features

## Testing

Before submitting:
- Test on multiple supported platforms
- Test with both OpenAI and Anthropic
- Verify error handling
- Check console for errors
- Test on different video lengths

## Adding Platform Support

To add a new video/audio platform:

1. Update `manifest.json` with new host permissions
2. Add detection logic in `content-script.js`
3. Implement content extraction method
4. Test thoroughly
5. Update README with new platform

## Questions?

Feel free to open an issue for any questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
