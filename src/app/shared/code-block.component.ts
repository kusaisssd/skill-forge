import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CodeSample } from '../models/course.model';

interface RenderedLine {
  number: number;
  text: string;
  note?: string;
}

/**
 * Displays a code sample the learner is meant to READ:
 * - filename + language header
 * - line numbers
 * - inline annotations on specific lines
 * - a copy-to-clipboard button
 *
 * Intentionally dependency-free (no syntax-highlighter library) so the app
 * stays small and the focus stays on reading and understanding code.
 */
@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div class="code-card">
      <div class="code-header">
        <div class="file-info">
          <mat-icon class="lang-icon">code</mat-icon>
          <span class="filename">{{
            sample().filename || sample().title
          }}</span>
          <span class="lang-chip">{{ sample().language }}</span>
        </div>
        <button
          mat-icon-button
          type="button"
          matTooltip="Copy code"
          (click)="copy()"
          aria-label="Copy code"
        >
          <mat-icon>{{ copied() ? 'check' : 'content_copy' }}</mat-icon>
        </button>
      </div>

      <pre class="code-body"><code>@for (line of lines(); track line.number) {<span
            class="code-line"
            [class.has-note]="!!line.note"
          ><span class="ln">{{ line.number }}</span><span class="lt">{{ line.text }}</span></span>}</code></pre>

      @if (notedLines().length > 0) {
        <div class="annotations">
          @for (line of notedLines(); track line.number) {
            <div class="annotation">
              <span class="anno-line">Line {{ line.number }}</span>
              <span class="anno-note">{{ line.note }}</span>
            </div>
          }
        </div>
      }

      @if (sample().explanation) {
        <p class="code-explanation">{{ sample().explanation }}</p>
      }
    </div>
  `,
  styles: [
    `
      .code-card {
        border: 1px solid #e1e5ee;
        border-radius: 12px;
        overflow: hidden;
        background: #0f172a;
        margin: 18px 0;
      }
      .code-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 8px 6px 14px;
        background: #1e293b;
        color: #cbd5e1;
      }
      .file-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .lang-icon {
        font-size: 18px;
        height: 18px;
        width: 18px;
        color: #7dd3fc;
      }
      .filename {
        font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .lang-chip {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        background: #334155;
        color: #93c5fd;
        padding: 2px 8px;
        border-radius: 20px;
      }
      .code-body {
        margin: 0;
        padding: 14px 0;
        overflow-x: auto;
        font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
        font-size: 13.5px;
        line-height: 1.65;
        color: #e2e8f0;
      }
      .code-line {
        display: block;
        padding: 0 16px;
      }
      .code-line.has-note {
        background: rgba(125, 211, 252, 0.12);
        border-left: 3px solid #38bdf8;
      }
      .ln {
        display: inline-block;
        width: 30px;
        margin-right: 14px;
        text-align: right;
        color: #64748b;
        user-select: none;
      }
      .lt {
        white-space: pre;
      }
      .annotations {
        background: #f8fafc;
        border-top: 1px solid #e1e5ee;
        padding: 10px 14px;
      }
      .annotation {
        display: flex;
        gap: 10px;
        padding: 4px 0;
        font-size: 13px;
        color: #334155;
      }
      .anno-line {
        flex: 0 0 auto;
        font-weight: 600;
        color: #0369a1;
        font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
      }
      .code-explanation {
        margin: 0;
        padding: 12px 14px;
        background: #fff;
        border-top: 1px solid #e1e5ee;
        color: #334155;
        font-size: 14px;
        line-height: 1.6;
      }
    `,
  ],
})
export class CodeBlockComponent {
  readonly sample = input.required<CodeSample>();
  readonly copied = signal(false);

  readonly lines = computed<RenderedLine[]>(() => {
    const s = this.sample();
    const noteByLine = new Map<number, string>();
    for (const a of s.annotations ?? []) {
      noteByLine.set(a.line, a.note);
    }
    return s.code.replace(/\n$/, '').split('\n').map((text, i) => ({
      number: i + 1,
      text,
      note: noteByLine.get(i + 1),
    }));
  });

  readonly notedLines = computed(() =>
    this.lines().filter((l) => !!l.note)
  );

  copy(): void {
    const text = this.sample().code;
    const done = () => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    };
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  }
}
