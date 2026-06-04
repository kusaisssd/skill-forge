import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Renders a tiny, safe subset of markdown used in lesson concept text:
 *   `code`   -> <code class="inline">code</code>
 *   **bold** -> <strong>bold</strong>
 *
 * All other characters are HTML-escaped first, so this is XSS-safe even
 * though the result is bound with [innerHTML].
 */
@Pipe({ name: 'formatText', standalone: true })
export class FormatTextPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
    const raw = value ?? '';
    const escaped = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const withCode = escaped.replace(
      /`([^`]+)`/g,
      '<code class="inline">$1</code>'
    );
    const withBold = withCode.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong>$1</strong>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(withBold);
  }
}
