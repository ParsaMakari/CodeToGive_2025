import logging
import sys


def setup_logging() -> None:
    root = logging.getLogger()
    if root.handlers:
        # Already configured
        return
    handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter(
        "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )
    handler.setFormatter(formatter)
    root.setLevel(logging.INFO)
    root.addHandler(handler)
